import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })//instancia que conversa do back com docker

export const executarCodigo = async (codigo: string): Promise<string> => {
  const container = await docker.createContainer({ //cria container e define as regras
    Image: 'node:20-alpine',
    Cmd: ['node', '-e', codigo],
    NetworkDisabled: true,
    HostConfig: {
      Memory: 50 * 1024 * 1024, // 50MB
      CpuPeriod: 100000,
      CpuQuota: 50000, // 50% CPU
      AutoRemove: true,
    }
  })

  await container.start()

  const logs = await container.logs({
    follow: true,
    stdout: true,
    stderr: true
  })

  return new Promise((resolve) => {
    let output = ''
    logs.on('data', (chunk: Buffer) => {
      output += chunk.slice(8).toString()
    })
    logs.on('end', () => {
      resolve(output.trim())
    })
  })
}