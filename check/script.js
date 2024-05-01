document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('results');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        resultsList.innerHTML = ''; // Limpiar resultados anteriores

        // Hacer solicitud al API de GitHub
        fetch('https://api.github.com/repos/devflyz/check/contents')
            .then(response => response.json())
            .then(data => {
                // Filtrar archivos JSON
                const jsonFiles = data.filter(file => file.name.toLowerCase().includes(searchTerm) && file.name.endsWith('.json'));
                
                // Mostrar resultados
                jsonFiles.forEach(file => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = file.html_url;
                    link.textContent = file.name;
                    listItem.appendChild(link);
                    resultsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error al obtener archivos JSON:', error);
            });
    });
});
