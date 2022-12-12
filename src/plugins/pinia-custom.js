// eslint-disable-next-line no-undef
import helper from "@/helper/helper";
export default () => {
  const { $axios } = helper();
  const { $swal } = helper();
  return {
    $axios: $axios,
    $swal: $swal,
  };
};
