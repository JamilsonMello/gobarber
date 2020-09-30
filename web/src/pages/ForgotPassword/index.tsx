import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../context/ToastContentex';

import { Container, Content, AnimationContainer, Background } from './styles';

interface DataInputs {
  email: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DataInputs) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        const { email } = data;


      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error na recuperação',
          description: 'Ocorreu um erro ao tentar recuperar a senha, tente novamente!',
        });
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuper senha</h1>

            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />

            <Button type="submit">Recuperar</Button>

          </Form>

          <Link to="/signup">
            <FiLogIn size={16} />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SingIn;
