const Bodycams = () => {
    return (
        <div>
            <center>
                <h2>BodyCam</h2>
            </center>
            <Tabela dados={dados} toogleModal={toogleModal} atualizarTabela={atualizarTabela} />

            <Modal showModal={showModal} fechar={toogleModal}
                form={<FormsBodyCam bodycam={bodycam} idEntity={id} toogleModal={toogleModal} atualizarTabela={atualizarTabela} />}
            >
            </Modal>

            <MenuLateral handleToogleModal={handleToogleModal} toogleTheme={toogleTheme} theme={theme} />
        </div>
    )
}

export default Bodycams;