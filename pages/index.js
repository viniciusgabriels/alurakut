import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>        
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">            
            {props.title} ({props.items.length})
          </h2>
          <ul>            
            {/* {props.items.map((itemAtual) => {
              return (
                <li key={itemAtual}>                  
                  <a href={`/users/${itemAtual}`} hey={itemAtual}>                
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
                )
            })} */}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = useState([]);
  // {
  //   id: '654684324',
  //   title: 'Eu odeio acordar cedo',
  //   image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  // },
  // {
  //   id: '6546871',
  //   title: 'Eu abro a geladeira pra pensar',
  //   image: 'https://pbs.twimg.com/media/CQWp7t4WgAAGam7.jpg:large'
  // },
  // {
  //   id: '6546873',
  //   title: 'Imagina se pega no olho?',
  //   image: 'https://img10.orkut.br.com/community/5373477955e66c51a726293.60511497_348c38258d729e2060a94187fd78b146.jpg'
  // },
  // {
  //   id: '6546874',
  //   title: 'Lindomar, O SubZero Brasileiro',
  //   image: 'https://pbs.twimg.com/media/DotI5JpU8AAwB1f.jpg'
  // },
  // {
  //   id: '6546875',
  //   title: 'Se eu Morrer Minha Mãe me Mata',
  //   image: 'https://www.giantbomb.com/a/uploads/scale_small/0/6172/1548061-1.jpg'
  // },
  // {
  //   id: '6546876',
  //   title: 'Tenho medo da Véia(o) Quaker!',
  //   image: 'https://img10.orkut.br.com/community/3b860ff2a931fc79ba0de8aab1ef17de.jpg'
  // },
  
  const githubUser = 'viniciusgabriels';
  const pessoasFavoritas = [
    'omariosouto', 
    'rafaballerini', 
    'marcobrunodev',
    'kevin-powell',
    'diego3g',
    'filipedeschamps',
    // 'juunegreiros',
    // 'peas', 
    // 'vanessametonini',
    // 'JulianaAmoasei',
    // 'gabsferreira',
  ]

  const [seguidores, setSeguidores] = useState([]);

  useEffect(function() {
    fetch('https://api.github.com/users/viniciusgabriels/followers')
    .then (function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '78c8e2923a998ddc7aa1099633f6af',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesDato)
    })
  }, [])

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>        
        <Box>
          <h1 className="title">
            Bem Vindo
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <div>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriateCommunity(e) {
              e.preventDefault();
              const dadosDosForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade),
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })
              
            }}>
              <div>                
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>                
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </div>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>  
        {/* <ProfileRelationsBox title="Pessoas da comunidade" items={pessoasFavoritas}/>       */}
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>      
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">            
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>            
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>                  
                  <a href={`/users/${itemAtual}`}>                
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
                )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        {/* <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">            
            Seguidores ({seguidores.length})
          </h2>
          <ul>            
            {seguidores.map((itemAtual) => {
              return (
                <li key={itemAtual}>                  
                  <a href={`/users/${itemAtual}`}>                
                    <img src={`https://github.com/${itemAtual.login}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
                )
            })}
          </ul>
        </ProfileRelationsBoxWrapper> */}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">            
            Comunidades ({comunidades.length})
          </h2>
          <ul>            
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>                  
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
                )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>  
    </>
  )
}

export async function getStaticProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  //criar mensagem de erro de login

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
