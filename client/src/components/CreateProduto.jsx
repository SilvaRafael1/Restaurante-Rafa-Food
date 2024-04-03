import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import client from "../api/Api"
import { Typography } from "@mui/material"
import "../css/Form.css"

function CreateProduto() {
  const handleSubmit = (data) => client.post("/produtos", data).then(() => {
    console.log("Produto criado com sucesso: ", data);
    alert("Produto criado com sucesso! Para mais detalhes consulte o log")
    window.location.href = "http://127.0.0.1:5173";
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    description: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    price: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    image: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
  })

  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: "",
  }

  return (
    <div className="form-area">
      <div className="form">
        <Typography variant="h4">
          Formulário de Criação de Produto
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nome: </label>
                <Field name="name" id="name" type="text" className={'form-control' + (errors.name && touched.name ? 'is-invalid' : '')} />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição: </label>
                <Field name="description" id="description" type="text" className={'form-control' + (errors.description && touched.description ? 'is-invalid' : '')} />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Preço: </label>
                <Field name="price" id="price" type="text" className={'form-control' + (errors.price && touched.price ? 'is-invalid' : '')} />
                <ErrorMessage name="price" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="image">Imagem URL: </label>
                <Field name="image" id="image" type="text" className={'form-control' + (errors.image && touched.image ? 'is-invalid' : '')} />
                <ErrorMessage name="image" component="div" className="invalid-feedback" />
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

export default CreateProduto;