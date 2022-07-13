import * as styles from './styles'
import UnCheckImg from '@/public/assets/unchecked.png'
import CheckImg from '@/public/assets/checked.png'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

type Props = {
  label?: string
  name?: string
  value?: string
  [key: string]: any
}

const CustomCheckbox = (
  { label, name, value, defaultChecked = false, ...rest }: Props,
  inputRef: any,
) => {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div onClick={() => setChecked(!checked)} css={styles.container}>
      <input
        type="checkbox"
        ref={inputRef}
        value={value}
        name={name}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
        {...rest}
      />
      <label>
        <Image src={checked ? CheckImg : UnCheckImg} />
      </label>
      <label>{label}</label>
    </div>
  )
}

export default React.forwardRef(CustomCheckbox)
