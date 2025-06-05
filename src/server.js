import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import PDFDocument from 'pdfkit';
import fs from 'fs';
;

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(express.static('public'));

// Login fake: apenas passando nome e perfil
app.post('/login', (req, res) => {
  const { nome, perfil } = req.body;
  res.json({ nome, perfil });
});

// Buscar OS
app.get('/os/:id', async (req, res) => {
  const os = await prisma.ordemServico.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(os);
});

// Assinar OS
app.post('/assinar', async (req, res) => {
  const { id, nome, perfil } = req.body;
  const assinatura = `Assinado por ${nome} em ${new Date().toLocaleString()}`;

  const dataUpdate = perfil === 'tecnico'
    ? { assinaturaTecnico: assinatura, dataAssinaturaTecnico: new Date() }
    : { assinaturaGestor: assinatura, dataAssinaturaGestor: new Date() };

  await prisma.ordemServico.update({
    where: { id },
    data: dataUpdate
  });

  res.json({ message: `${perfil} assinou com sucesso!` });
});

// Gerar PDF
app.get('/gerar-pdf/:id', async (req, res) => {
  const os = await prisma.ordemServico.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  const doc = new PDFDocument();
  const filePath = `./public/os_${os.id}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text(`Ordem de Serviço #${os.id}`);
  doc.moveDown().fontSize(14).text(`Descrição: ${os.descricao}`);

  doc.moveDown().text(`Assinatura Técnico: ${os.assinaturaTecnico || 'Pendente'}`);
  doc.text(`Assinatura Gestor: ${os.assinaturaGestor || 'Pendente'}`);

  doc.end();

  res.download(filePath);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
