import unroll from 'unroll';
import { escape, getUnit, sortByMaxTemperature } from '../common';

unroll.use(it);

describe('common util', () => {
  it('should escape special characters', () => {
    expect(escape(`Cha\ r`)).toEqual('Cha r');
  });

  it('should sort by max temperature', () => {
    const arr = [
      {
        main: {
          temp_max: 13
        }
      },
      {
        main: {
          temp_max: 23
        }
      }
    ];

    expect(arr.sort(sortByMaxTemperature)).toEqual([
      {
        main: {
          temp_max: 23
        }
      },
      {
        main: {
          temp_max: 13
        }
      }
    ] );
  });

  unroll(
    'should return #result for #unit unit',
    (done, args) => {
      expect(getUnit(args.unit)).toEqual(args.result);
      done();
    },
    [['unit', 'result'], ['metric', 'C'], ['imperial', 'F'], ['', 'K']]
  );
});
