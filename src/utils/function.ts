export const truncarTexto = (texto: string, limite = 22) => {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite - 3) + "...";
}

