import nc from 'next-connect';
import fs from 'node:fs';
// import uploadMulterS3 from 'utils/uploadMulterS3';
import uploadMulterFolder from 'utils/uploadMulterFolder';

// import prisma from 'lib/prisma';

const outputFolderName = './public/uploads';
const handler = nc({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },

  onNoMatch(req, res) {
    res
      .statusCode(405)
      .json({ error: `Método '${req.method}' não permitido!` });
  }
})
  // .use(uploadMulterS3.single('file'))
  .use(uploadMulterFolder.single('file'))

  .post(async (req, res) => {
    const filenames = fs.readdirSync(outputFolderName);
    const image = filenames.map(name => name);

    return res.status(200).json({ data: image });

    // const { email, nomeDoc } = req.body;

    // await prisma.user.update({
    //   where: { email: email },
    //   data: {
    //     documentos: {
    //       create: {
    //         nomeDoc: nomeDoc,
    //         dataExpira: new Date('2022-03-19'),
    //         validado: false,
    //         caminho: req.file.location,
    //       },
    //     },
    //   },
    // });

    // return res.status(200).json({ message: 'ok' });
  })
  .get(async (req, res) => {
    const userId = req.query.userId;
    // TODO: tirar o prisma daqui:
    // const result = await prisma.documento.findMany({
    //   where: {
    //     userId,
    //   },
    // });
    res.json(result);
  });

export const config = {
  api: {
    // sem o 'bodyparser: false':
    // não consegue passar file + algo no req.body (eu acho)
    // ou não consegue acessar o req. e o body na resposta
    bodyParser: false
  }
};
export default handler;
