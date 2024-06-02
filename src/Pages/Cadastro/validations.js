export const validateNome = (nome) => {
    if (nome.trim() === "") {
      return "Por favor, insira seu nome.";
    }

    return null;
  }
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Por favor, insira um e-mail válido.";
    }
    return null;
  }
  
  export const validateTelefone = (telefone) => {
    if (telefone.trim() === "") {
      return "Por favor, insira seu telefone.";
    }
    return null;
  }
  