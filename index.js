let participantes = [
    {
        nome: "Lucas Gabriel",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 20, 22),
        dataCheckIn: new Date(2024, 2, 2, 22, 30),
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 3, 19, 23),
        dataCheckIn: new Date(2024, 0, 4, 20, 20),
    },
    {
        nome: "Pedro Oliveira",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 1, 5, 18, 45),
        dataCheckIn: new Date(2024, 1, 6, 21, 15),
    },
    {
        nome: "Mariana Silva",
        email: "mariana@gmail.com",
        dataInscricao: new Date(2024, 3, 10, 17, 30),
        dataCheckIn: new Date(2024, 3, 11, 18, 40),
    },
    {
        nome: "Gustavo Santos",
        email: "gustavo@gmail.com",
        dataInscricao: new Date(2024, 4, 15, 22, 10),
        dataCheckIn: new Date(2024, 4, 16, 23, 45),
    },
    {
        nome: "Isabela Lima",
        email: "isabela@gmail.com",
        dataInscricao: new Date(2024, 5, 20, 21, 55),
        dataCheckIn: new Date(2024, 5, 21, 22, 50),
    },
    {
        nome: "Rafaela Oliveira",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 6, 25, 19, 15),
        dataCheckIn: new Date(2024, 6, 26, 20, 30),
    },
    {
        nome: "Carlos Sousa",
        email: "carlos@gmail.com",
        dataInscricao: new Date(2024, 7, 30, 16, 40),
        dataCheckIn: new Date(2024, 7, 31, 17, 55),
    },
    {
        nome: "Leticia Costa",
        email: "leticia@gmail.com",
        dataInscricao: new Date(2024, 8, 5, 15, 20),
        dataCheckIn: new Date(2024, 8, 6, 16, 25),
    },
    {
        nome: "Diego Martins",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 9, 10, 14, 10),
        dataCheckIn: new Date(2024, 9, 11, 15, 35),
    },
]


const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)
    
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar check-in
        </button>
      `
    }
  
    return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null  
    }
  
    // verificar se o particpante já existe
    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )
  
    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }
  
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
  
    // limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }
  
  const fazerCheckIn = (event) => {
    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  
    if(confirm(mensagemConfirmacao) == false) {
      return
    }
  
    // encontrar o participante dentro da lista
    const participante = participantes.find(
      (p) => p.email == event.target.dataset.email  
    )
    
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()
  
    // atualizar a lista de participantes
    atualizarLista(participantes)
  }