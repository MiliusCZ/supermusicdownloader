// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'supermusic.sk' },
            pageUrl: { urlContains: 'idpiesne' },
          })
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  const songId = url.searchParams.get('idpiesne');
  const title = getCleanedTitle(tab.title);

  const exportUrl = `http://www.supermusic.cz/export.php?stiahni=1&typ=TXT&idpiesne=${songId}`;
  const exportFileName = `${title}.txt`;

  downloadFile(exportUrl, exportFileName);
});

const downloadFile = (exportUrl, exportFileName) => {
  chrome.downloads.download({
    url: exportUrl,
    filename: `supermusic/${exportFileName}`
  });
}

const toClear = [
  ' [akordy a text na Supermusic.sk]',
  ' - správně',
  ' [akordy na Supermusic.sk]',
  ' - spravne',
  ' (správně)',
  '(spravne)',
  '(správně)',
  ':',
  '?'
];

const getCleanedTitle = (title) => {
  toClear.map((clearItem) => title = title.replace(clearItem, ''));
  return title;
} 
