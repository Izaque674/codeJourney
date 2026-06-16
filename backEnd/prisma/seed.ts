import { prisma } from '../src/prisma'

async function main() {
  await prisma.tentativa.deleteMany()
  await prisma.casoTeste.deleteMany()
  await prisma.desafio.deleteMany()

  // INICIANTE
  await prisma.desafio.create({
    data: {
      titulo: 'Soma de dois números',
      descricao: 'Escreva uma função chamada soma que recebe dois números e retorna a soma deles.',
      dificuldade: 'iniciante',
      outputEsperado: '',
      exemplo: 'soma(2, 3) → 5\nsoma(10, 5) → 15\nsoma(-1, 1) → 0',
      casoteste: {
        create: [
          { input: 'soma(2, 3)', esperado: '5' },
          { input: 'soma(10, 5)', esperado: '15' },
          { input: 'soma(-1, 1)', esperado: '0' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Maior número',
      descricao: 'Escreva uma função chamada maior que recebe dois números e retorna o maior entre eles.',
      dificuldade: 'iniciante',
      outputEsperado: '',
      exemplo: 'maior(3, 7) → 7\nmaior(10, 2) → 10\nmaior(5, 5) → 5',
      casoteste: {
        create: [
          { input: 'maior(3, 7)', esperado: '7' },
          { input: 'maior(10, 2)', esperado: '10' },
          { input: 'maior(5, 5)', esperado: '5' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Comprimento de string',
      descricao: 'Escreva uma função chamada tamanho que recebe uma string e retorna o número de caracteres dela.',
      dificuldade: 'iniciante',
      outputEsperado: '',
      exemplo: 'tamanho("hello") → 5\ntamanho("code") → 4\ntamanho("") → 0',
      casoteste: {
        create: [
          { input: 'tamanho("hello")', esperado: '5' },
          { input: 'tamanho("code")', esperado: '4' },
          { input: 'tamanho("")', esperado: '0' },
        ]
      }
    }
  })

  // INTERMEDIÁRIO
  await prisma.desafio.create({
    data: {
      titulo: 'Fatorial',
      descricao: 'Escreva uma função chamada fatorial que recebe um número n e retorna o seu fatorial. O fatorial de 0 é 1.',
      dificuldade: 'intermediario',
      outputEsperado: '',
      exemplo: 'fatorial(5) → 120\nfatorial(3) → 6\nfatorial(0) → 1',
      casoteste: {
        create: [
          { input: 'fatorial(5)', esperado: '120' },
          { input: 'fatorial(3)', esperado: '6' },
          { input: 'fatorial(0)', esperado: '1' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Palíndromo',
      descricao: 'Escreva uma função chamada palindromo que recebe uma string e retorna true se ela for igual ao contrário, false caso contrário.',
      dificuldade: 'intermediario',
      outputEsperado: '',
      exemplo: 'palindromo("arara") → true\npalíndromo("hello") → false\npalíndromo("ovo") → true',
      casoteste: {
        create: [
          { input: 'palindromo("arara")', esperado: 'true' },
          { input: 'palindromo("hello")', esperado: 'false' },
          { input: 'palindromo("ovo")', esperado: 'true' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Contar vogais',
      descricao: 'Escreva uma função chamada contarVogais que recebe uma string e retorna quantas vogais ela contém. Considere apenas as vogais: a, e, i, o, u.',
      dificuldade: 'intermediario',
      outputEsperado: '',
      exemplo: 'contarVogais("hello") → 2\ncontarVogais("javascript") → 3\ncontarVogais("sky") → 0',
      casoteste: {
        create: [
          { input: 'contarVogais("hello")', esperado: '2' },
          { input: 'contarVogais("javascript")', esperado: '3' },
          { input: 'contarVogais("sky")', esperado: '0' },
        ]
      }
    }
  })

  // AVANÇADO
  await prisma.desafio.create({
    data: {
      titulo: 'Fibonacci',
      descricao: 'Escreva uma função chamada fibonacci que recebe um número n e retorna o n-ésimo número da sequência de Fibonacci. A sequência começa: 1, 1, 2, 3, 5, 8, 13...',
      dificuldade: 'avancado',
      outputEsperado: '',
      exemplo: 'fibonacci(1) → 1\nfibonacci(6) → 8\nfibonacci(10) → 55',
      casoteste: {
        create: [
          { input: 'fibonacci(1)', esperado: '1' },
          { input: 'fibonacci(6)', esperado: '8' },
          { input: 'fibonacci(10)', esperado: '55' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Anagrama',
      descricao: 'Escreva uma função chamada anagrama que recebe duas strings e retorna true se elas forem anagramas uma da outra. Duas palavras são anagramas se usam as mesmas letras em ordem diferente.',
      dificuldade: 'avancado',
      outputEsperado: '',
      exemplo: 'anagrama("listen", "silent") → true\nanagrama("hello", "world") → false\nanagrama("triangle", "integral") → true',
      casoteste: {
        create: [
          { input: 'anagrama("listen", "silent")', esperado: 'true' },
          { input: 'anagrama("hello", "world")', esperado: 'false' },
          { input: 'anagrama("triangle", "integral")', esperado: 'true' },
        ]
      }
    }
  })

  await prisma.desafio.create({
    data: {
      titulo: 'Remover duplicatas',
      descricao: 'Escreva uma função chamada removerDuplicatas que recebe um array de números e retorna um novo array sem valores repetidos, mantendo a ordem original.',
      dificuldade: 'avancado',
      outputEsperado: '',
      exemplo: 'removerDuplicatas([1, 2, 2, 3]) → [1,2,3]\nremoverDuplicatas([1, 1, 1]) → [1]\nremoverDuplicatas([1, 2, 3]) → [1,2,3]',
      casoteste: {
        create: [
          { input: 'JSON.stringify(removerDuplicatas([1, 2, 2, 3]))', esperado: '[1,2,3]' },
          { input: 'JSON.stringify(removerDuplicatas([1, 1, 1]))', esperado: '[1]' },
          { input: 'JSON.stringify(removerDuplicatas([1, 2, 3]))', esperado: '[1,2,3]' },
        ]
      }
    }
  })

  console.log('✅ Seed executado com sucesso!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())