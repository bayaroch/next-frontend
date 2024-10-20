## Buttons

### Primary button

Primary buttons highlight what the interface wants or expects users to do. They should stand out from the rest of the interface and other buttons, especially ones that are close. Primary buttons are commonly found as CTAs such as Submit buttons on forms.

<p align="left">
  <img alt="Primary button" src="https://i.ibb.co/9YLytZv/Screenshot-2023-10-13-112138.png">
</p>

```javascript
<Button variant="contained" color="primary">
    Primary
</Button>
```

### Secondary button

Secondary buttons are alternatives to primary buttons. If the Submit button is primary, the Cancel button would be secondary. Secondary buttons should have more subdued styling, allowing primary buttons to take center stage within the design.

<p align="left">
  <img alt="Secondary button" src="https://i.ibb.co/XS66vxh/Screenshot-2023-10-13-105526.png">
</p>

```javascript
<Button variant="outlined" color="primary">
    Secondary
</Button>
```

### Tertiary button

Tertiary buttons are for lesser-performed actions — those that users are unlikely to perform. Therefore, they shouldn’t be attention-grabbing at all. In fact, you may want to place tertiary buttons away from the other buttons in an interface to prevent users from accidentally selecting them.

<p align="left">
  <img alt="Tertiary button" src="https://i.ibb.co/ZT0qrhg/Screenshot-2023-10-13-110040.png">
</p>

```javascript
<Button variant="outlined" color="secondary">
    Tertiary
</Button>
```

### Alternative action button

In scenarios where multiple primary actions are present, the alternative action button is introduced in a sleek black color. This button provides users with an alternative, less emphasized option. While still important, it serves as a secondary choice compared to the red primary button.

<p align="left">
  <img alt="Alternative action button" src="https://i.ibb.co/wZnfZSD/Screenshot-2023-10-13-110414.png">
</p>

```javascript
<Button variant="contained" color="secondary">
    Alternative action
</Button>
```

### Text button

Text buttons only include text, with no icons. They also don’t include borders or fill colors. Text-only buttons have significantly less visual weight, so it’s recommended to use them only for less-important actions.

<p align="left">
  <img alt="Text button" src="https://i.ibb.co/0r68gXx/Screenshot-2023-10-13-162633.png">
</p>

```javascript
<Button variant="text" color="primary">
    Text
</Button>
```

### Icon text button

Text buttons include text and icons. They also don’t include borders or fill colors. Icon text buttons have significantly same visual weight, so it’s recommended to use them only for less-important actions.

<p align="left">
  <img alt="Icon text button" src="https://i.ibb.co/KXdCZ7b/Screenshot-2023-10-13-162749.png">
</p>

```javascript
<Button variant="text" color="inherit">
    <FontAwesomeIcon
        style={{ marginRight: 16, top: -1, position: 'relative' }}
        size={'lg'}
        icon={faArrowAltCircleLeft}
    />
    Icon text
</Button>
```