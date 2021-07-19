import React, { useState, useEffect } from 'react';
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
  const [comunidades, setComunidades] = useState([{
    id: '654684324',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '6546871',
    title: 'Eu abro a geladeira pra pensar',
    image: 'https://pbs.twimg.com/media/CQWp7t4WgAAGam7.jpg:large'
  },
  {
    id: '6546873',
    title: 'Imagina se pega no olho?',
    image: 'https://img10.orkut.br.com/community/5373477955e66c51a726293.60511497_348c38258d729e2060a94187fd78b146.jpg'
  },
  {
    id: '6546874',
    title: 'Lindomar, O SubZero Brasileiro',
    image: 'https://pbs.twimg.com/media/DotI5JpU8AAwB1f.jpg'
  },
  {
    id: '6546875',
    title: 'Se eu Morrer Minha Mãe me Mata',
    image: 'https://www.giantbomb.com/a/uploads/scale_small/0/6172/1548061-1.jpg'
  },
  {
    id: '6546876',
    title: 'Tenho medo da Véia(o) Quaker!',
    image: 'https://img10.orkut.br.com/community/3b860ff2a931fc79ba0de8aab1ef17de.jpg'
  },
  ]);
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
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
                  <a href={`/users/${itemAtual}`} hey={itemAtual}>                
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
                  <a href={`/users/${itemAtual}`} hey={itemAtual}>                
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
                  <a href={`/users/${itemAtual.title}`} hey={itemAtual.title}>                
                    <img src={itemAtual.image} />
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
