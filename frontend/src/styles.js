const styles = {
    textfield:
        { style: { color: 'white' }, sx: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'orange',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'orange',
        },
      },}
}

export default styles;