import ProcessStatusService from "./ProcessStatusService"

describe('ProcessStatusService', () => {
  it('must return in validation status', async () => {
    const service = new ProcessStatusService();

    const status = service.execute({
      cpf: '111.111.111-70'
    })

    expect(status).toBe('Em validação')
  })
})

describe('ProcessStatusService', () => {
  it('must return in approved status', async () => {
    const service = new ProcessStatusService();

    const status = service.execute({
      cpf: '153.509.460-56'
    })

    expect(status).toBe('Aprovado')
  })
})