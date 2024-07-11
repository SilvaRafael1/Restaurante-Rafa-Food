import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import client from "../api/Api"
import { Typography } from "@mui/material"
import "../css/Form.css"
import { useNavigate, useLocation } from "react-router-dom"


const CreatePedido = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const produtos = location.state.produtos

  if(produtos.length === 0) {
    return (
        <div>Sacola de produtos vazia</div>
    )
  }

  const handleSubmit = (data) => client.post("/pedidos", data).then(() => {
    console.log("Pedido criado com sucesso: ", data);
    navigate("/getPedidos");
  })

  const validationSchema = Yup.object().shape({
    endereco: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório")
  })

  const initialValues = {
    endereco: "",
    produtos: produtos
  }

  return (
    <div className="form-area">
      <div className="form">
        <Typography variant="h4">
          Formulário de Criação de Pedido
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="endereco">Endereço: </label>
                <Field name="endereco" id="endereco" type="text" className={'form-control' + (errors.endereco && touched.endereco ? 'is-invalid' : '')} />
                <ErrorMessage name="endereco" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group flex justify-center">
                <button className="py-[7px] px-[15px] hover:bg-red-500 hover:text-white" type="submit">Enviar</button>
                <button className="py-[7px] px-[15px] hover:bg-red-500 hover:text-white" type="button" onClick={resetForm}>Limpar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreatePedido