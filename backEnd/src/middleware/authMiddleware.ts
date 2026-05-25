
const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({erro:'token nao fornecido'});
    }

    const partes = authHeader.split('');
    const [esquema, token] = partes;

    if(esquema !== 'Bearer'){
        return res.status(401).json({erro: 'token malformatada'})
    }
    






}