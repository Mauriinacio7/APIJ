const vision = require('@google-cloud/vision');
const path = require('path');

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

async function validarImagem(caminho) {
  const [result] = await client.labelDetection(caminho);
  const labels = result.labelAnnotations.map(label => label.description.toLowerCase());

  console.log('Labels detectadas:', labels);

  const palavrasValidas = ['recycling', 'plastic', 'bottle', 'can', 'carton', 'metal', 'glass'];
  const valido = labels.some(label => palavrasValidas.includes(label));

  return {
    valido,
    labels,
    textos: labels.join(', ')
  };
}

module.exports = validarImagem;
