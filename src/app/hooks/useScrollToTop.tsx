import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);  // Rola até o topo da página
  }, []);  // O array vazio faz o efeito rodar apenas uma vez quando o componente é montado
};

export default useScrollToTop;
