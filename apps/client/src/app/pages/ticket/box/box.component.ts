import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BoxDto } from '@lotto-challenge/dto';

interface NumWithDrawnState {
  num: number;
  drawn: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lotto-challenge-box',
  templateUrl: './box.html',
  styleUrl: './box.scss',
})
export class BoxComponent implements OnInit {
  @Input()
  box!: BoxDto;

  numberList: NumWithDrawnState[] = [];

  /**
   * Iterates over the sorted array to assign the drawn state so we only have O(49) complexity
   * instead of a naive Array.includes with O(6*49)
   */
  ngOnInit(): void {
    const allNumbers = [];

    let drawnNumbersIndex = 0;

    for (let i = 1; i <= 49; i++) {
      let drawn = false;
      if (
        drawnNumbersIndex < 6 &&
        i === this.box.drawnNumbers[drawnNumbersIndex]
      ) {
        drawn = true;
        drawnNumbersIndex++;
      }

      allNumbers.push({
        num: i,
        drawn,
      });
    }

    this.numberList = allNumbers;
  }
}
