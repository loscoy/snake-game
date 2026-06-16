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
      // 获取排行榜 - 返回示例数据
      return res.status(200).json({
        success: true,
        scores: [
          {
            username: "Player 1",
            score: 150,
            length: 16,
            level: 3,
            timestamp: new Date().toISOString()
          },
          {
            username: "Player 2",
            score: 120,
            length: 13,
            level: 2,
            timestamp: new Date().toISOString()
          },
          {
            username: "Player 3",
            score: 90,
            length: 10,
            level: 2,
            timestamp: new Date().toISOString()
          }
        ],
        message: 'Scores retrieved successfully'
      });
    } else if (req.method === 'POST') {
      // 保存分数
      const { username, score, length, level } = req.body;

      // 验证输入
      if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
      }

      if (typeof score !== 'number' || score < 0) {
        return res.status(400).json({ error: 'Invalid score' });
      }

      const scoreRecord = {
        username: username.substring(0, 20),
        score,
        length,
        level,
        timestamp: new Date().toISOString()
      };

      return res.status(200).json({
        success: true,
        message: 'Score saved successfully',
        data: scoreRecord
      });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
