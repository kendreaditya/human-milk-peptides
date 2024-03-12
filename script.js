document.addEventListener('DOMContentLoaded', function() {
    fetch('Cleavage Site Sequences.csv')
        .then(response => response.text())
        .then(csvText => {
            const csvData = csvText.split('\n').map(row => row.split(','));
            const rootDiv = document.getElementById('csv-root');
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            csvData[0].forEach(headerText => {
                const header = document.createElement('th');
                header.textContent = headerText;
                headerRow.appendChild(header);
            });
            table.appendChild(headerRow);
            csvData.slice(1).forEach(rowData => {
                const row = document.createElement('tr');
                rowData.forEach(cellData => {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    row.appendChild(cell);
                });
                table.appendChild(row);
            });
            rootDiv.appendChild(table);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const rootDiv = document.getElementById('csv-root');
    const searchInput = document.getElementById('search-input');

    fetch('Cleavage Site Sequences.csv')
        .then(response => response.text())
        .then(csvText => {
            const csvData = parseCSV(csvText);
            displayTable(csvData, rootDiv);
            
            searchInput.addEventListener('keyup', function() {
                const filteredData = filterData(csvData, searchInput.value);
                displayTable(filteredData, rootDiv);
            });
        });
});

function parseCSV(csvText) {
    return csvText.trim().split('\n').map(row => row.split(','));
}

function displayTable(data, root) {
    root.innerHTML = ''; // Clear existing table/data
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    data[0].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    data.slice(1).forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    root.appendChild(table);
}

function filterData(data, searchText) {
    if (!searchText) return data; // No filter if search text is empty
    const lowerCaseSearchText = searchText.toLowerCase();
    return [
        data[0], // Keep header row
        ...data.slice(1).filter(row => 
            row.some(cell => cell.toLowerCase().includes(lowerCaseSearchText))
        )
    ];
}

