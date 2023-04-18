import {
  chakra,
  FormControlOptions,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useFormControl,
  useMergeRefs,
  useMultiStyleConfig,
  usePopper,
} from '@chakra-ui/react'
import { mergeWith } from '@chakra-ui/utils'
import { useSelect } from 'downshift' // using version 6.1.3
import { Children, cloneElement, forwardRef, isValidElement, ReactElement, useMemo } from 'react'
import { SelectIcon } from './SelectIcon'

export interface SelectProps
  extends FormControlOptions,
    ThemingProps<'Select'>,
    Omit<
      HTMLChakraProps<'button'>,
      'disabled' | 'required' | 'readOnly' | 'size' | 'value' | 'onChange'
    > {
  placeholder?: string
  value?: string | null | undefined
  onChange?: (item: string | null | undefined) => void
}

export const CustomSelect = forwardRef<HTMLButtonElement, SelectProps>((props, ownRef) => {
  const { id, value, children, placeholder, onChange, ...rest } = omitThemingProps(props)
  const ownButtonProps = useFormControl<HTMLButtonElement>(rest)
  const styles = useMultiStyleConfig('CustomSelect', props)

  const validChildren = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<{ value: string; children?: ReactElement }>>(isValidElement)
        .filter((child) => 'value' in child.props),
    [children],
  )

  const items = validChildren.map((child) => child.props.value)

  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    id,
    items,
    selectedItem: value,
    onSelectedItemChange: (val) => onChange?.(val.selectedItem),
  })

  const { referenceRef: popperRef, getPopperProps } = usePopper({
    enabled: isOpen,
    gutter: 2,
  })
  const { ref: useSelectToggleButtonRef, ...useSelectToggleButtonProps } = getToggleButtonProps()

  const toggleButtonRef = useMergeRefs(ownRef, useSelectToggleButtonRef, popperRef)
  const toggleButtonProps = mergeWith(ownButtonProps, useSelectToggleButtonProps)

  return (
    <chakra.div position="relative">
      <chakra.button
        ref={toggleButtonRef}
        __css={styles.field}
        data-focus-visible-added={isOpen}
        {...toggleButtonProps}
      >
        {validChildren.find((child) => child.props.value === selectedItem)?.props.children ||
          selectedItem || <chakra.span>{placeholder}</chakra.span>}
        <SelectIcon />
      </chakra.button>
      <chakra.div
        zIndex="1"
        width="100%"
        {...mergeWith(getPopperProps(), {
          style: { visibility: isOpen ? 'visible' : 'hidden' },
        })}
      >
        <chakra.ul __css={styles.menu} data-focus-visible-added={isOpen} {...getMenuProps()}>
          {isOpen &&
            validChildren.map((item, index) =>
              cloneElement(item, {
                __css: styles.option,
                ...getItemProps({ item: item.props.value, index }),
              }),
            )}
        </chakra.ul>
      </chakra.div>
    </chakra.div>
  )
})

CustomSelect.displayName = 'CustomSelect'
