from flask import Flask, request, jsonify
import colorama
import flask_cors
import datetime

colorama.init()

class Lanchonete():
    def __init__(self, server):
        self.timestamp = datetime.datetime.now().timestamp()
        self.server = server
        self.produtos = {
            "Hamburguer": 10,
            "Batata Frita": 5,
            "Combão Da Casa": 30,
            "Marijuana": 5,
            "Dr. Carlos Césio": 25
        }
        self.pedidos = {}
        self.contador = 1
        self.registrarrotas()

        print(f"{colorama.Fore.GREEN}>> Sistema inicializado.{colorama.Style.RESET_ALL} Timestamp: {self.timestamp}")

    def registrarrotas(self):

        @self.server.route("/api/v1/pedido", methods=["POST"])
        def registrarpedido(self):
            data = request.json
            
            cliente = str(data["cliente"]["nome"])
            telefone = str(data["cliente"]["telefone"])
            endereco = str(data["cliente"]["endereco"])

            itens = list(data["itens"])
            preços = list(map(lambda x: x == self.produtos[0], itens))
            total = 0
            for item in itens:
                nome = item["nome"]
                total += self.produtos[nome]
            obs = str(data["observacao"])
            status = str(data["status"]).lower()


            # ----------------------------------
            # -------- PROCESSAMENTO -----------
            # ----------------------------------

            

            if len(cliente) == 0:
                return jsonify({
                    "erro": "Nome não informado"
                }), 400

            elif len(endereco) == 0:
                return jsonify({
                    "erro": "Endereço não informado"
                }), 400

            elif total <= 0:
                return jsonify({
                    "erro": "Total inválido"
                }), 400

            self.contador += 1
            chave = f"pedido{self.contador}"
            self.pedidos[chave] = {
                "cliente": {
                    "nome": cliente,
                    "numero": telefone,
                    "endereco": endereco
                },
                "itens": itens,
                "obs": obs,
                "total": total,
                "status": "processado"
            }

            return jsonify({
                "mensagem": "Pedido registrado",
                "pedido": self.pedidos[chave]
            })
        

        @self.server.route("/api/v1/pedidos", methods=["GET"])
        def listarpedidos():
            return jsonify(self.pedidos)

        @self.server.route("/api/v1/lanches", methods=["GET"])
        def listarlanches():
            return jsonify(self.produtos)






servidor = Flask(__name__)
flask_cors.CORS(servidor)
Lanchonete(servidor)
servidor.run(debug=True)
