// APIを利用するための宣言
import { world } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";

var showFlg = false;
// ブロックを右クリックした後に呼ばれるイベント
world.afterEvents.playerInteractWithBlock.subscribe(event => {
    // hitしたブロックの情報
    var block = event.block;
    // 右クリックしたプレイヤーの情報
    var player = event.player;
    // // プレイヤーにコマンドを実行させるメソッド
    // player.runCommand("say @s このブロックは「" + block.typeId + "」です");
    // 右クリック1回のつもりでも押した時間分実行されてしまうので一工夫
    if (!showFlg) {
        showFlg = true;
        let messageForm = new MessageFormData()
        .title({ text: "ブロック情報" })
        .body({ text: "ブロックIDを表示しますか?"})
        .button1("いいえ")
        .button2("はい");
    messageForm
        // クリックしたプレイヤーに対して表示する
        .show(player)
        .then((formData) => {
            // はい(選択値=0)を選択した場合
            if (formData.selection == 1) {
                // sayコマンドのようにプレイヤーがメッセージ送信するメソッド
                player.sendMessage("このブロックは「" + block.typeId + "」");
            }
            showFlg = false;
        })
        // メッセージウィンドウでエラーになった場合
        .catch((error) => {
            player.sendMessage("エラーが発生しました：" + error);
        });
    }
});
