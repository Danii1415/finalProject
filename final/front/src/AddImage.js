import { Button } from "@material-ui/core";

const AddImage = ({
  image,
  nextStep,
  prevStep,
  onImageChange,
  removePictureClick,
}) => {
  return (
    <div>
      <div>
        <img src={image} />
        <input type="file" name="image" onChange={onImageChange} />
      </div>
      <Button disabled={image ? false : true} onClick={removePictureClick}>
        הסר תמונה
      </Button>
      <Button disabled={image ? false : true} onClick={nextStep}>
        עבור לסיכום ההגשה
      </Button>
    </div>
  );
};

export default AddImage;
