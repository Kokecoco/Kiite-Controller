// Kiiteのタブで指定されたコードを実行する関数
async function executeKiiteScript(func) {
  // "https://kiite.jp/*" に一致するタブを検索
  const tabs = await chrome.tabs.query({ url: "https://kiite.jp/*" });

  if (tabs.length > 0) {
    // Kiiteのタブが見つかった場合、最初のタブに対してスクリプトを実行
    const tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: func
    });
  } else {
    // Kiiteのタブが開かれていない場合
    console.log("Kiiteのタブが見つかりませんでした。");
  }
}

// ショートカットキーのコマンドが実行されたときの処理
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);

  switch (command) {
    case "toggle-play":
      executeKiiteScript(() => {
        document.getElementsByClassName("pl-btn-play")[0]?.click();
      });
      break;
    case "next-track":
      executeKiiteScript(() => {
        document.getElementsByClassName("pl-btn-next")[0]?.click();
      });
      break;
    case "prev-track":
      executeKiiteScript(() => {
        document.getElementsByClassName("pl-btn-pre")[0]?.click();
      });
      break;
  }
});