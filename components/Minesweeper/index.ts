export interface MineBlock {
  x: number
  y: number
  /** @desc 是否掀开 */
  revealed: boolean
  /** @desc 是否是炸弹 */
  mine: boolean
  /** @desc  */
  flagged: boolean
  /** @desc 周围炸弹数 */
  adjacentMines: number
}

export interface MineState {
  isDev: boolean
  // 游戏难度
  mode: 'normal' | 'default' | 'hard'
  mineCount: Record<MineState['mode'], {
    x: number
    y: number
    total: number
  }>
  /** 炸弹二维数组 */
  mines: MineBlock[][]
  /** 总雷数 */
  total: number
  gameState: 'win' | 'over' | 'play'
  /** 是否生成了炸弹 */
  generateMine: boolean
}
