import algo from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '1d7d7ab44d83dd6f3d6cf586159b8d';
        const client = new SiteClient(TOKEN);

        //Validar os dados
        const registroCriado = await client.items.create({
            itemType: "977385", //ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade teste",
            // imageUrl: "https://github.com/viniciusgabriels.png",
            // creatorSlug: "viniciusgabriels",
        });

        console.log(registroCriado); //deve aparecer somente no terminal, não no console d onavegador

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        });
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem'
    });
}