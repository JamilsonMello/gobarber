import { celebrate, Joi, Segments } from 'celebrate';

export const forgetPassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export const resetPassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().alphanum().min(6).required(),
    confirm_password: Joi.string()
      .alphanum()
      .min(6)
      .required()
      .equal(Joi.ref('password')),
    token: Joi.string().uuid().required(),
  }),
});
