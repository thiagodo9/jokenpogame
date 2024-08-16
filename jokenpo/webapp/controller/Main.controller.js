sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("exercicios.fiori.jokenpo.controller.Main", {
            onInit: function () {

                // Cria modelo para controle de quantos jogos foram realizados
                // e quantos jogos o jogador e o computador ganharam
                let baseModelData = {
                    "playerWins": 0,
                    "computerWins": 0
                };

                // Cria o modelo JSON para armazenar os dados de controle
                let jsonModel = new sap.ui.model.json.JSONModel(baseModelData);

                // Atribui o modelo JSON a view para que ele possa ser usado na tela
                this.getView().setModel(jsonModel, "modelControl");

                // Cria um modelo para armazenar os valores padrão usados no código
                baseModelData = {
                    "rockKey": 1,
                    "paperKey": 2,
                    "scissorKey": 3,
                    "winKey": "W",
                    "loseKey": "L",
                    "drawKey": "D"
                };

                // Cria o modelo JSON para armazenar as constantes
                jsonModel = new sap.ui.model.json.JSONModel(baseModelData);

                // Atribui o modelo JSON a view para que ele possa ser usado na tela
                this.getView().setModel(jsonModel, "modelConstants");

            },

            playGameWithRock: function (oEvent) {

                const globalConstants = this.getView().getModel("modelConstants").getData();
                this.playGame(globalConstants.rockKey);

            },

            playGameWithPaper: function (oEvent) {
                const globalConstants = this.getView().getModel("modelConstants").getData();
                this.playGame(globalConstants.paperKey);
            },

            playGameWithScissor: function (oEvent) {
                const globalConstants = this.getView().getModel("modelConstants").getData();
                this.playGame(globalConstants.scissorKey);
            },

            playGame: function (playerAction) {

                let that = this;

                const globalConstants = this.getView().getModel("modelConstants").getData();
                let globalControl = this.getView().getModel("modelControl").getData();

                let computerAction = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

                let result = this.isPlayerTheWinner(playerAction, computerAction);

                let playerActionText = this.getActionText(playerAction);
                let computerActionText = this.getActionText(computerAction);

                let message = "";

                switch (result) {
                    case globalConstants.winKey:
                        message = "Você jogou " + playerActionText + ". O computador jogou " + computerActionText + ". Você ganhou!";
                        globalControl.playerWins++;
                        break;

                    case globalConstants.loseKey:
                        message = "Você jogou " + playerActionText + ". O computador jogou " + computerActionText + ". Você perdeu!";
                        globalControl.computerWins++;
                        break;

                    case globalConstants.drawKey:
                        message = "Você jogou " + playerActionText + ". O computador jogou " + computerActionText + ". Vocês empataram!";
                        break;

                    default:
                        break;
                }

                MessageBox.information(message, {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {

                        if (globalControl.playerWins === 2) {
                            MessageBox.success("Você ganhou o jogo!");
                            globalControl.playerWins = 0;
                            globalControl.computerWins = 0;

                        } else if (globalControl.computerWins === 2) {
                            MessageBox.error("O computador ganhou o jogo!");
                            globalControl.playerWins = 0;
                            globalControl.computerWins = 0;
                        }

                        that.getView().getModel("modelControl").setData(globalControl);

                    },
                    dependentOn: this.getView()
                });

            },

            isPlayerTheWinner: function (player, computer) {

                const globalConstants = this.getView().getModel("modelConstants").getData();

                switch (player) {
                    case globalConstants.rockKey:
                        if (computer === globalConstants.rockKey) return globalConstants.drawKey;
                        if (computer === globalConstants.paperKey) return globalConstants.loseKey;
                        if (computer === globalConstants.scissorKey) return globalConstants.winKey;
                        break;

                    case globalConstants.paperKey:
                        if (computer === globalConstants.rockKey) return globalConstants.winKey;
                        if (computer === globalConstants.paperKey) return globalConstants.drawKey;
                        if (computer === globalConstants.scissorKey) return globalConstants.loseKey;
                        break;

                    case globalConstants.scissorKey:
                        if (computer === globalConstants.rockKey) return globalConstants.loseKey;
                        if (computer === globalConstants.paperKey) return globalConstants.winKey;
                        if (computer === globalConstants.scissorKey) return globalConstants.drawKey;
                        break;

                    default:
                        break;
                }

            },

            getActionText: function (action) {

                const globalConstants = this.getView().getModel("modelConstants").getData();

                switch (action) {
                    case globalConstants.rockKey:
                        return "Pedra";
                        break;

                    case globalConstants.paperKey:
                        return "Papel";
                        break;

                    case globalConstants.scissorKey:
                        return "Tesoura";
                        break;

                    default:
                        break;
                }

            }

        });
    });
