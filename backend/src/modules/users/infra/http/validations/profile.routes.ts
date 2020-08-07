import { celebrate, Joi, Segments } from 'celebrate';

export const updateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).alphanum(),
    confirm_password: Joi.string()
      .min(6)
      .alphanum()
      .when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      })
      .when('password', {
        is: true,
        then: Joi.ref('password'),
      }),
    old_password: Joi.string()
      .min(6)
      .alphanum()
      .when('password', { is: Joi.exist(), then: Joi.required() }),
  }),
});
