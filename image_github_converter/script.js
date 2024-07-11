function copyToClipboard() {
    const outputDiv = document.getElementById('output');
    const textToCopy = outputDiv.innerText;

    navigator.clipboard.writeText(textToCopy).then(function() {
        const copyIcon = document.getElementById('copyIcon');
        copyIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        copyIcon.style.color = '#28a745';
        copyIcon.classList.add('show');

        setTimeout(function() {
            copyIcon.innerHTML = '<i class="fas fa-copy"></i>';
            copyIcon.style.color = '#007bff';
            copyIcon.classList.remove('show');
        }, 1000);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

function copyTableToClipboard() {
    const tableOutputDiv = document.getElementById('table-output');
    const textToCopy = tableOutputDiv.innerText;

    navigator.clipboard.writeText(textToCopy).then(function() {
        const copyTableIcon = document.getElementById('copyTableIcon');
        copyTableIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        copyTableIcon.style.color = '#28a745';
        copyTableIcon.classList.add('show');

        setTimeout(function() {
            copyTableIcon.innerHTML = '<i class="fas fa-copy"></i>';
            copyTableIcon.style.color = '#007bff';
            copyTableIcon.classList.remove('show');
        }, 1000);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

document.getElementById('convertButton').addEventListener('click', function() {
    const markdownInput = document.getElementById('markdownInput').value;
    const outputDiv = document.getElementById('output');
    const tableOutputDiv = document.getElementById('table-output');
    const widthInput = document.getElementById('widthInput').value;

    const lines = markdownInput.split('\n');
    const regex = /!\[.*\]\((.*)\)/;
    let htmlOutput = '';
    let tableOutput = '| First Header  | Second Header |\n| ------------- | ------------- |\n';

    let row = [];

    lines.forEach((line) => {
        const match = line.match(regex);
        if (match && match[1]) {
            const imageUrl = match[1];
            const htmlImage = `<img src="${imageUrl}" width="${widthInput}px">`;
            htmlOutput += htmlImage + '<br>';
            row.push(htmlImage);

            if (row.length === 2) {
                tableOutput += `| ${row.join(' | ')} |\n`;
                row = [];
            }
        }
    });

    if (row.length === 1) {
        tableOutput += `| ${row[0]} | |\n`;
    }

    if (htmlOutput) {
        const escapedHtmlOutput = htmlOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/<br>/g, '&lt;br&gt;\n');
        outputDiv.innerHTML = `<code>${escapedHtmlOutput}</code>`;
        copyIcon.style.display = 'block';
    } else {
        outputDiv.innerHTML = 'Invalid markdown image syntax';
        copyIcon.style.display = 'none';
    }

    if (tableOutput) {
        tableOutputDiv.innerText = tableOutput;
        document.getElementById('copyTableIcon').style.display = 'block';
    } else {
        tableOutputDiv.innerHTML = 'Invalid markdown image syntax';
        document.getElementById('copyTableIcon').style.display = 'none';
    }  
});

// Collapsible section script
document.addEventListener('DOMContentLoaded', function() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
                content.style.display = "none";
            } else {
                content.style.display = "block";
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            }
        });
    }
});

document.getElementById('markdownInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('convertButton').click();
    }
});

document.getElementById('widthInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('convertButton').click();
    }
});


