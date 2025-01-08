import './style.css'

interface props {
  isOpen: boolean
  close: React.Dispatch<React.SetStateAction<boolean>>
}

export function RegisterForm({ isOpen }: props): JSX.Element {
  return (
    <>
      {isOpen ? (
        <div className="modal register-form">
          <h1>Registrar Usuário</h1>
          <form>
            <div>
              <label>Usuário:</label>
              <input type="text" />
            </div>
            <div>
              <label>Senha:</label>
              <input type="text" />
            </div>
            <div>
              <label>Confirmar Senha:</label>
              <input type="text" />
            </div>
            <button>Confirmar</button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
