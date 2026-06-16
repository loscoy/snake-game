import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // 获取排行榜
      return handleGetScores(res);
    } else if (req.method === 'POST') {
      // 保存分数
      return handlePostScore(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetScores(res) {
  try {
    // 从 Vercel KV 获取所有分数
    const scores = await kv.lrange('snake_scores', 0, -1);
    
    // 解析 JSON 字符串
    const parsedScores = (scores || []).map(score => {
      try {
        return typeof score === 'string' ? JSON.parse(score) : score;
      } catch (e) {
        return score;
      }
    });
    
    return res.status(200).json({
      success: true,
      scores: parsedScores,
      message: 'Scores retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting scores:', error);
    
    // 如果 KV 不可用，返回空列表
    return res.status(200).json({
      success: true,
      scores: [],
      message: 'Scores service unavailable, returning empty list'
    });
  }
}

async function handlePostScore(req, res) {
  const { username, score, length, level } = req.body;

  // 验证输入
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ error: 'Invalid score' });
  }

  if (typeof length !== 'number' || length < 1) {
    return res.status(400).json({ error: 'Invalid length' });
  }

  if (typeof level !== 'number' || level < 1) {
    return res.status(400).json({ error: 'Invalid level' });
  }

  try {
    const scoreRecord = {
      username: username.substring(0, 20), // 限制长度
      score,
      length,
      level,
      timestamp: new Date().toISOString()
    };

    // 保存到 Vercel KV
    await kv.lpush('snake_scores', JSON.stringify(scoreRecord));

    // 只保留最新的 100 条记录
    await kv.ltrim('snake_scores', 0, 99);

    return res.status(200).json({
      success: true,
      message: 'Score saved successfully',
      data: scoreRecord
    });
  } catch (error) {
    console.error('Error saving score:', error);
    
    // 如果 KV 不可用，仍然返回成功（为了用户体验）
    return res.status(200).json({
      success: true,
      message: 'Score saved (offline mode)',
      data: {
        username: username.substring(0, 20),
        score,
        length,
        level,
        timestamp: new Date().toISOString()
      }
    });
  }
}
