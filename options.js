// Saves options to chrome.storage
function save_options() {
    setStatus('Saving options');
    var path = document.getElementById('selectedPath').innerText;
    chrome.storage.sync.set({
        downloadPath: path
    }, function () {
        setStatusMessage('Options saved', 750);
    });
}

function restore_options() {
    setStatusMessage('Loading options', 500);
    chrome.storage.sync.get({
        downloadPath: 'default',
    }, function (items) {
        document.getElementById('selectedPath').innerText = items.downloadPath;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

function setStatusMessage(message, duration) {
    setStatus(message);
    setTimeout(function () {
        setDefaultStatus();
    }, duration);

}

function setDefaultStatus() {
    setStatus('No options are available at the moment');
}

function setStatus(text) {
    var status = document.getElementById('status');
    status.textContent = text;
}

document.getElementById("choosePath").addEventListener('click',
    choosePath);

function choosePath() {
    chrome.fileSystem.chooseEntry( {
      type: 'openDirectory',
    }, folder => document.document.getElementById('selectedPath').innerText = folder);
}
