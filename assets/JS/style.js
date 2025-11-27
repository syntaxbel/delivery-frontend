// Captura todas as células editáveis
const editableCells = document.querySelectorAll('td[contenteditable="true"]');

editableCells.forEach(cell => {
  // Salva valor original ao começar edição
  cell.addEventListener('focus', function() {
    this.dataset.oldValue = this.textContent;
  });
  
  // Detecta mudança ao terminar edição
  cell.addEventListener('blur', function() {
    const newValue = this.textContent.trim();
    const oldValue = this.dataset.oldValue;
    
    if (newValue !== oldValue) {
      console.log('Mudou:', oldValue, '→', newValue);
      // Aqui você pode enviar para o servidor
      saveToServer(this, newValue);
    }
  });
});

// Captura mudança no select de status
document.querySelectorAll('.status-select').forEach(select => {
  select.addEventListener('change', function() {
    console.log('Status mudou para:', this.value);
    saveToServer(this, this.value);
  });
});

// Função exemplo para salvar no servidor
function saveToServer(element, value) {
  // Aqui você faria um fetch/ajax para salvar
  console.log('Salvando:', value);
}
