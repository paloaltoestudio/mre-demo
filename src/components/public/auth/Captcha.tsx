import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
  onChangeCaptcha: (value: string | null) => void;
};

export const Captcha = ({ onChangeCaptcha }: CaptchaProps) => {
  return (
    <ReCAPTCHA
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      className="mx-auto"
      onChange={(value) => onChangeCaptcha(value)}
    />
  );
};
