import "../styles/formGroup.scss"


const FormGroup = ({ type ="text", label, placeholder, value, onChange}) => {
  return (
    <div className="form-group">
    <label htmlFor={label}>{label}</label>
      <input
            type={type}
            id={label}
            name={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
          />
    </div>
  )
}

export default FormGroup
