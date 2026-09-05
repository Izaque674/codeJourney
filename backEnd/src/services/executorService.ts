import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

export const executarCodigo = async (codigo: string): Promise<string> => {
  const container = await docker.createContainer({
    Image: 'node:20-alpine',
    Cmd: ['node', '-e', codigo],
    NetworkDisabled: true,
    HostConfig: {
      Memory: 50 * 1024 * 1024,
      CpuPeriod: 100000,
      CpuQuota: 50000,
    }
  })

await container.start()

// Timeout de 5 segundos
const timeoutPromise = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout: código demorou demais')), 5000)
)

await Promise.race([container.wait(), timeoutPromise])
  .catch(async (err) => {
    await container.stop()
    await container.remove()
    throw err
  })

  await container.wait()

  const logs = await container.logs({
    stdout: true,
    stderr: true
  })

  await container.remove()

  return logs.toString().slice(8).trim()
}