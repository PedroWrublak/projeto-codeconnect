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

inputTags.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "" && avaibleTags.includes(tagTexto)) {
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            tagList.appendChild(newTag);
            inputTags.value = "";
        } else {
            alert('Tag inválida');
        }
    }
})

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