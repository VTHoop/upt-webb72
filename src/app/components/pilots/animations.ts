import { trigger, animateChild, group, transition, animate, style, query } from '@angular/animations';

const optional = { optional: true };

const slideToRight = [
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        // top: 0,
        right: 0,
        width: '100%'
      })
    ],
    optional
  ),
  query(':enter', [style({ right: '-100%' })]),
  group([
    query(':leave', [animate('500ms ease', style({ right: '100%' }))], optional),
    query(':enter', [animate('500ms ease', style({ right: '0%' }))])
  ]),
  query(':leave', animateChild(), optional),
  query(':enter', animateChild())
];

const slideToLeft = [
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        // top: 0,
        left: 0,
        width: '100%'
      })
    ],
    optional
  ),
  query(':enter', [style({ left: '-100%' })]),
  group([
    query(':leave', [animate('500ms ease', style({ left: '100%' }))], optional),
    query(':enter', [animate('500ms ease', style({ left: '0%' }))])
  ]),
  query(':leave', animateChild(), optional),
  query(':enter', animateChild())
];

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideToLeft),
  transition('* => isRight', slideToRight),
  transition('isRight => *', slideToLeft),
  transition('isLeft => *', slideToRight)
]);
