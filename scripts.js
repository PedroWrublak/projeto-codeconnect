const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do aquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem")
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const tagList = document.getElementById("lista-tags");

tagList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-tag")) {
        const removedTag = event.target.parentElement;
        tagList.removeChild(removedTag);
    }
})

const avaibleTags = [ "Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript" ];

async function verifyAvaibleTags (tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(avaibleTags.includes(tagText));
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const existTag = await verifyAvaibleTags(tagTexto);
                if (existTag) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    tagList.appendChild(newTag);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.")
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert('Erro ao verificar a existência da tag. Verfique o console.')
            }
    }
}
})

const publishBtn = document.querySelector(".botao-publicar");

publishBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const projectName = document.getElementById("nome").value;
    const projectDescripton = document.getElementById("descricao").value;
    const projectTags = Array.from(tagList.querySelectorAll("p")).map((tag) => tag.textContent);

    console.log(projectName);
    console.log(projectDescripton);
    console.log(projectTags);
})

async function publishProject (projectName, projectDescripton, projectTags) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const itWorked = Math.random() > 0.5; // Fator para saber se deu certo ou não, baseado na sorte (não faz parte do código)

            if (itWorked) {
                resolve("Projeto publicado com sucesso.")
            } else {
                reject("Erro ao publicar o projeto.")
            }

        }, 2000)
    })
}