version 1

```javascript
{
    type: 'fragment',
    childNodes: [
        {
            type: 'tag',
            name: 'div',
            attributes: {
                'class': 'block',
                'data-foo': 'bar'
            },
            childNodes: [
                {
                    type: 'text',
                    text: 'block text'
                }
            ]
        },
        {
            type: 'comment',
            text: 'comment text'
        }
    ]
}
```

version 2

```javascript
['fragment',
    ['tag'
        ['name', 'div'],
        ['attributes, [
            ['class', 'block'],
            ['data-bar', 'foo']
        ]],
        ['text'
            ['textContent', 'block text']
        ]
    ],
    ['comment',
        ['textContent', 'comment text']
    ]
]
```