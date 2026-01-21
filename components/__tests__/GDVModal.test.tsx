import { render, screen, fireEvent } from '@testing-library/react'
import GDVModal from '@/components/GDVModal'
import { GDV } from '@/lib/types'

describe('GDVModal', () => {
  const mockGdv: GDV = {
    id: '1',
    ho_ten: 'Nguyễn Văn A',
    sdt: '0901234567',
    email: 'test@example.com',
    facebook: 'facebook.com/nguyenvana',
    zalo: '0901234567',
    dia_chi: '123 Đường ABC',
    chi_nhanh: 'Chi nhánh Hà Nội',
    avatar_url: null,
    mo_ta: 'Giao dịch viên chuyên nghiệp',
  }

  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('does not render when isOpen is false', () => {
    render(<GDVModal gdv={mockGdv} isOpen={false} onClose={mockOnClose} />)
    
    expect(screen.queryByText('Nguyễn Văn A')).not.toBeInTheDocument()
  })

  it('renders modal with GDV details when isOpen is true', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    // Check if main details are displayed
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument()
    expect(screen.getByText('Chi nhánh Hà Nội')).toBeInTheDocument()
    expect(screen.getAllByText('0901234567').length).toBeGreaterThan(0)
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('123 Đường ABC')).toBeInTheDocument()
    expect(screen.getByText('Giao dịch viên chuyên nghiệp')).toBeInTheDocument()
  })

  it('displays first letter when no avatar URL', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    // First letter should be in the avatar placeholder
    expect(screen.getByText('N')).toBeInTheDocument()
  })

  it('displays avatar image when avatar URL is provided', () => {
    const gdvWithAvatar = {
      ...mockGdv,
      avatar_url: 'https://example.com/avatar.jpg',
    }
    
    render(<GDVModal gdv={gdvWithAvatar} isOpen={true} onClose={mockOnClose} />)
    
    const image = screen.getByAltText('Nguyễn Văn A')
    expect(image).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    const closeButton = screen.getByLabelText('Đóng')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking outside modal', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    // Click on the backdrop (the outer div)
    const backdrop = screen.getByText('Nguyễn Văn A').closest('div')?.parentElement?.parentElement?.parentElement
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not call onClose when clicking inside modal content', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    const modalContent = screen.getByText('Nguyễn Văn A')
    fireEvent.click(modalContent)
    
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape key is pressed', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    fireEvent.keyDown(document, { key: 'Escape' })
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not render when gdv is null', () => {
    render(<GDVModal gdv={null} isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.queryByText('Chi nhánh:')).not.toBeInTheDocument()
  })

  it('only displays available fields', () => {
    const minimalGdv: GDV = {
      id: '2',
      ho_ten: 'Trần Thị B',
    }
    
    render(<GDVModal gdv={minimalGdv} isOpen={true} onClose={mockOnClose} />)
    
    expect(screen.getByText('Trần Thị B')).toBeInTheDocument()
    expect(screen.queryByText('Chi nhánh:')).not.toBeInTheDocument()
    expect(screen.queryByText('Điện thoại:')).not.toBeInTheDocument()
  })

  it('renders social links as clickable', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    const facebookLink = screen.getByText('facebook.com/nguyenvana')
    expect(facebookLink).toHaveAttribute('href')
    expect(facebookLink).toHaveAttribute('target', '_blank')
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders phone and email as clickable links', () => {
    render(<GDVModal gdv={mockGdv} isOpen={true} onClose={mockOnClose} />)
    
    // Find phone link by its href attribute
    const phoneLink = screen.getByRole('link', { name: /0901234567/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:0901234567')
    
    const emailLink = screen.getByText('test@example.com')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:test@example.com')
  })
})
