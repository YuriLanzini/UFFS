from Search_Heuristics.Local.Neighbourhood.Vizinhanca import Vizinhanca
from Search_Heuristics.Solucao import Solucao
import math


class VizinhancaSwap(Vizinhanca):
    def __init__(self, distancias: tuple[tuple[int]]):
        super().__init__("node-swap", distancias, 1)

    def computar_qualidade(self, solucao: Solucao, i: int, j: int) -> int:

        qualidade = solucao.qualidade
        elemento_pre_i, elemento_i, elemento_pos_i, elemento_pre_j, elemento_j, elemento_pos_j = solucao.retornar_elementos(i, j)

        # Remove as distâncias das arestas que serão alteradas
        qualidade -= (self.distancias[elemento_i][elemento_pre_i] +
                      self.distancias[elemento_i][elemento_pos_i] +
                      self.distancias[elemento_j][elemento_pre_j] +
                      self.distancias[elemento_j][elemento_pos_j])

        # Adiciona as distâncias das novas arestas
        qualidade += (self.distancias[elemento_j][elemento_pre_i] +
                      self.distancias[elemento_j][elemento_pos_i] +
                      self.distancias[elemento_i][elemento_pre_j] +
                      self.distancias[elemento_i][elemento_pos_j])

        # Considera a troca de arestas adjacentes
        if abs(i - j) == 1:
            qualidade += self.distancias[elemento_i][elemento_j] + self.distancias[elemento_j][elemento_i]

        return qualidade

    @staticmethod
    def gerar_novo_ciclo(solucao: Solucao, i: int, j: int) -> list:

        novo_ciclo = solucao.ciclo[:]
        novo_ciclo[i], novo_ciclo[j] = novo_ciclo[j], novo_ciclo[i]
        return novo_ciclo

    def melhor_vizinho(self, solucao: Solucao, tabu: set) -> Solucao:

        melhor_qualidade = math.inf
        imelhor = -1
        jmelhor = -1

        for i in range(len(solucao.ciclo)):
            if solucao.ciclo[i] not in tabu:
                for j in range(i + 1, len(solucao.ciclo)):
                    if solucao.ciclo[j] not in tabu:
                        qualidade = self.computar_qualidade(solucao, i, j)
                        if qualidade < melhor_qualidade:
                            melhor_qualidade = qualidade
                            imelhor = i
                            jmelhor = j

        # Retorna a nova solução apenas se um vizinho melhor for encontrado
        if imelhor != -1 and jmelhor != -1:
            novo_ciclo = self.gerar_novo_ciclo(solucao, imelhor, jmelhor)
            return Solucao(melhor_qualidade, novo_ciclo, solucao.ciclo[imelhor], solucao.ciclo[jmelhor])
        return solucao

    def primeiro_vizinho_melhor(self, solucao: Solucao, tabu: set) -> Solucao:

        for i in range(len(solucao.ciclo)):
            if solucao.ciclo[i] not in tabu:
                for j in range(i + 1, len(solucao.ciclo)):
                    if solucao.ciclo[j] not in tabu:
                        qualidade = self.computar_qualidade(solucao, i, j)
                        if qualidade < solucao.qualidade:
                            novo_ciclo = self.gerar_novo_ciclo(solucao, i, j)
                            return Solucao(qualidade, novo_ciclo, solucao.ciclo[i], solucao.ciclo[j])
        return solucao
