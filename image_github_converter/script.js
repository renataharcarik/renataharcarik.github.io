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

document.getElementById('convertButton').addEventListener('click', function() {
    const markdownInput = document.getElementById('markdownInput').value;
    const outputDiv = document.getElementById('output');
    const copyIcon = document.getElementById('copyIcon');
    const widthInput = document.getElementById('widthInput').value;

    const lines = markdownInput.split('\n');
    const regex = /!\[.*\]\((.*)\)/;
    let htmlOutput = '';

    lines.forEach(line => {
        const match = line.match(regex);
        if (match && match[1]) {
            const imageUrl = match[1];
            const htmlImage = `<img src="${imageUrl}" width="${widthInput}px">`;
            htmlOutput += htmlImage + '<br>';
        }
    });

    if (htmlOutput) {
        const escapedHtmlOutput = htmlOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/<br>/g, '&lt;br&gt;\n');
        outputDiv.innerHTML = `<code>${escapedHtmlOutput}</code>`;
        copyIcon.style.display = 'block';
    } else {
        outputDiv.innerHTML = 'Invalid markdown image syntax';
        copyIcon.style.display = 'none';
    }
});
