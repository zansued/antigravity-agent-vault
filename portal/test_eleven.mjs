
async function testEleven() {
  const apiKey = process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_API_KEY;
  const agentId = process.env.AGENT_ID || 'pNInz6obpgmqSCAK6u6o';

  console.log('Testing ElevenLabs with:');
  console.log('API Key present:', !!apiKey);
  console.log('Agent ID:', agentId);

  if (!apiKey) {
    console.log('Error: No API Key found in environment.');
    return;
  }

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`, {
      headers: { 'xi-api-key': apiKey }
    });
    
    console.log('Status:', res.status);
    const data = await res.text();
    console.log('Response:', data);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testEleven();
